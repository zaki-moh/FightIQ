import Link from 'next/link'
import Image from 'next/image'
import FooterItems from './FooterItems'
import Socials from './Socials'

const Footer = () => {
  return (
    <footer className="bg-[#050D27] text-white py-10">
    <div className="max-w-6xl mx-auto 
      flex flex-col item-start gap-10
      md:flex-row md:gap-32 
      lg:gap-[20rem]
      xl:gap[23rem]
      2xl:gap[24rem]
      items-start">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/assets/icons/croppedLogo.png"
          alt="logo"
          width={1526}
          height={1024}
          className="h-14 w-auto object-top"
        />
        <p className="text-sm text-white/60">© 2025 SportaAI</p>
      </div>
      <div>
        <FooterItems />
      </div>
      <div>
        <Socials />
      </div>
    </div>
    </footer>
  );
};

export default Footer;
