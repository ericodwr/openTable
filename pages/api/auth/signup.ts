import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { firstName, lastName, email, phone, city, password } = req.body;

  if (method == 'POST') {
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'First name is Invalid',
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: 'First name is Invalid',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isLength(city, {
          min: 1,
        }),
        errorMessage: 'City is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage:
          'Password should include uppercase, lowercase, number, and special characters',
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

    const userWithEmail = await prisma.user.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (userWithEmail == email) {
      return res
        .status(400)
        .json({ errorMessage: 'Email is associated with another account' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        city,
        phone,
      },
    });

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(secret);

    setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({ message: 'Sign Up Successfully' });
  }

  if (method == 'GET') {
    const data = await prisma.restaurant.findMany();
    return res.json({
      message: 'yow this shit fire',
      name: 'jason momomomom',
      data,
    });
  }

  return res.status(404).json({ message: 'Unkown endpoint' });
}
