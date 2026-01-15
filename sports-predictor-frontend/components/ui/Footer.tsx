import Link from 'next/link'
import Image from 'next/image'
import FooterItems from './FooterItems'
import Socials from './Socials'

const Footer = () => {

  return (
    <footer className="bg-[#0A1F45] text-white py-10">
    <div className=" 
        max-w-6xl mx-auto px-6
        flex flex-col gap-12
        md:flex-row md:items-start md:justify-between
  ">
      <div className="flex flex-col items-center md:items-start gap-4">
        <Image
          src="/assets/icons/FightIQlogo.png"
          alt="logo"
            width={898} 
            height={366} 
          className="h-14 w-auto object-top"
        />
        <p className="text-sm text-white/60">© 2025 FightIQ</p>
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
