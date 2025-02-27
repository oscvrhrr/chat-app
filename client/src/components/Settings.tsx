import * as Form from "@radix-ui/react-form"
import { Heading } from "@radix-ui/themes";

const SettingsForm = () => (
	<Form.Root className="w-[460px] p-8 border border-dark-mauve-700">
    <Heading>Settings</Heading>
		<Form.Field className="mb-2.5 grid" name="avatar">
			<div className="flex items-baseline justify-between">
				<Form.Label className="text-[15px] font-medium leading-[35px] text-white">
					Avatar
				</Form.Label>
				<Form.Message
					className="text-[13px] text-white opacity-80"
					match="valueMissing"
				>
					Please enter a new image
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
					className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
					type="text"
          placeholder="Enter a new image"
					required
				/>
			</Form.Control>
		</Form.Field>
		<Form.Field className="mb-2.5 grid" name="bio">
			<div className="flex items-baseline justify-between">
				<Form.Label className="text-[15px] font-medium leading-[35px] text-white">
					Bio
				</Form.Label>
				<Form.Message
					className="text-[13px] text-white opacity-80"
					match="valueMissing"
				>
					Please enter a bio
				</Form.Message>
			</div>
			<Form.Control asChild>
				<textarea
					className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
          placeholder="Enter a bio"
					required
				/>
			</Form.Control>
		</Form.Field>
		<Form.Submit asChild>
			<button className="mt-2.5 bg-dark-mauve-1000 text-white box-border inline-flex h-[35px] w-full items-center justify-center rounded px-[15px] font-medium leading-none text-violet11  hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
				Update Profile
			</button>
		</Form.Submit>
	</Form.Root>
);

export default SettingsForm;
