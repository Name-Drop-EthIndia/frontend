import Image from "next/image"
import Link from "next/link"
import ProfileCardDetails from "./ProfileCardDetails"
import QRCode from "react-qr-code"
import { useAccount, useSignMessage } from "wagmi"
import { encodeAbiParameters, parseAbiParameters } from "viem"
const ProfileCard = ({
	name,
	socialTags = [{ icon: "twitter", id: "id" }],
	avatar = "/avatar1.png",
}) => {
	
	const message = encodeAbiParameters(parseAbiParameters("address x"), profileAddress)
	const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
		message: message,
	})

	return (
		<>
			<div className="w-full max-w-[366px] h-[191px] profileCard frcsb hoverExpand">
				{/* user details */}
				<ProfileCardDetails />
				{/* user IMAGE */}
				<QRCode value={address + "?" + sig} />
				<div className="flex flex-col profileCardBg items-end justify-between h-full">
					<Link href={"/profile/id"} className="visitProfileBtn mt-4 mr-3">
						{" Visit profile >>"}
					</Link>
					<Image src={avatar} alt="avatar" width={157} height={157} />
				</div>
			</div>
		</>
	)
}

export default ProfileCard
