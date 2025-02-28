import { Flex } from "@radix-ui/themes"
import * as Avatar from "@radix-ui/react-avatar";

interface UserCardProps {
  children: React.ReactNode;
  key: number | undefined;
  avatar: string | undefined;
  handleRecipient: () => void ;
}

const UserCard = ({ children , key, avatar, handleRecipient  }: UserCardProps) => {
  return (
    <Flex onClick={ handleRecipient } align="center" className="bg-dark-black-200 my-2 border h-14 border-dark-black-300 hover:bg-dark-mauve-500 rounded" key={key}>
      <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
        <Avatar.Image
          className="size-full rounded-[inherit] object-cover"
          src={ avatar }
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