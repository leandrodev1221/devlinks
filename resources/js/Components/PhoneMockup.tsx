import { PlatformProps } from "@/types/platform"
import { ArrowRight } from "phosphor-react"
import PhoneMockupIllustration from "/public/assets/images/illustration-phone-mockup.svg";


type Props = {
  links: PlatformProps[]
}
export const PhoneMockup = ({ links }: Props) => {
  return (
  <div className="w-[307px] h-[631px] relative">
    <img src={PhoneMockupIllustration} alt="" />
    <div className="max-h-[300px] left-[1.05rem] overflow-y-auto bg-red absolute flex flex-col items-center justify-center w-[15.1rem] m-4 top-[16.4rem]">
      <ul className="w-full overflow-y-auto flex flex-col gap-[0.98rem]">
        {links.map((link) => (
          <li key={link.id} className={`flex items-center justify-between p-[0.72rem] rounded-md ${link.name === 'Frontend Mentor' ? 'border border-gray-300' : ''}`} style={{ backgroundColor: link.color }}>
            <div className="flex items-center gap-2">
              <img src={`/assets/images/${link.icon_url}-white.svg`} alt="" />
              <p className={`${link.name !== 'Frontend Mentor' ? 'text-white text-md' : 'text-dark-gray text-md'}`}>{link.name}</p>
            </div>
              <ArrowRight size={16} className={`${link.name !== 'Frontend Mentor' ? 'text-white' : 'text-dark-gray'}`} />
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}