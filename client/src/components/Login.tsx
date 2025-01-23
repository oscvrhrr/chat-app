import * as Form from "@radix-ui/react-form";

export const Login = () => {
  return (
   <>
    <Form.Root className="w-[330px] h-[400px] border border-dark-mauve-700 p-9 rounded-lg bg-dark-mauve-300">
        <Form.Field className="mb-2.5 grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Email
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="valueMissing"
            >
              Please enter your email
            </Form.Message>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="typeMismatch"
            >
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border bg-dark-mauve-200 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              placeholder="Enter your email address"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="password">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
             Password
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-80"
              match="valueMissing"
            >
              Please enter a password
            </Form.Message>
          </div>
          <Form.Control asChild>
          <input
              className="box-border bg-dark-mauve-200 inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              placeholder="Enter your password"
              type="password"
              required
              
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="mt-2.5 bg-dark-mauve-1000 text-white box-border inline-flex h-[35px] w-full items-center justify-center rounded px-[15px] font-medium leading-none text-violet11  hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Login
          </button>
        </Form.Submit>
      </Form.Root>
   </>
  )
}
