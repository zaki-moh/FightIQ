import Link from 'next/link'
import Image from 'next/image'
import FooterItems from './FooterItems'
import Socials from './Socials'

const Footer = () => {
  return (
    <footer className="bg-[#050D27] text-white py-10">
      <div
        className="
          max-w-6xl mx-auto
          flex flex-col items-center gap-12
          md:flex-row md:items-start md:justify-between md:gap-20
          lg:gap-32
          xl:gap-48
        "
      >
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image
            src="/assets/icons/croppedLogo.png"
            alt="logo"
            width={1526}
            height={1024}
            className="h-14 w-auto object-top"
          />
          <p className="text-sm text-white/60">© 2025 SportaAI</p>
        </div>

        <FooterItems />

        <Socials />
      </div>
    </footer>
  );
};

export default Footer;
