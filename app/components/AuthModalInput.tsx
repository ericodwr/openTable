import { ChangeEvent } from 'react';

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

const AuthModalInput = ({ inputs, handleChangeInput, isSignin }: Props) => {
  return (
    <div>
      {isSignin ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstName}
            name="firstName"
            required
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            name="lastName"
            required
            value={inputs.lastName}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          required
          onChange={handleChangeInput}
        />
      </div>
      {isSignin ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="string"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            name="phone"
            required
            value={inputs.phone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            name="city"
            required
            value={inputs.city}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          name="password"
          required
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default AuthModalInput;
