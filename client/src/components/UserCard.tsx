import { Flex } from "@radix-ui/themes"
import * as Avatar from "@radix-ui/react-avatar";

interface UserCardProps {
  children: React.ReactNode;
  key: number;
}

const UserCard = ({ children , key }: UserCardProps) => {
  return (
    <Flex align="center" className="bg-dark-black-200 my-2 border h-14 border-dark-black-300 hover:bg-dark-mauve-500 rounded" key={key}>
      <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
		  </Avatar.Root>
      { children }
    </Flex>
  )
}

export default UserCard