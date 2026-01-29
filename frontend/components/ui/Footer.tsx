import Link from 'next/link'
import Image from 'next/image'
import FooterItems from './FooterItems'
import Socials from './Socials'

const Footer = () => {
  return (
    <footer className="bg-[#0A1F45] text-white">
      <div
        className="
          max-w-6xl mx-auto px-4 sm:px-6
          py-10 sm:py-12
          flex flex-col items-center
          gap-8 sm:gap-10
          md:flex-row md:items-start md:justify-between
        "
      >
        <div className="flex flex-col items-center md:items-start gap-3">
          <Image
            src="/assets/icons/FightIQfinal.png"
            alt="FightIQ logo"
            width={512}
            height={256}
            className="h-9 sm:h-10 w-auto opacity-90"
            priority={false}
          />

          <p className="text-xs sm:text-sm text-white/50">
            © 2025 FightIQ
          </p>
        </div>

        <div className="text-center md:text-left">
          <FooterItems />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-center md:justify-start opacity-80">
            <Socials />
          </div>
          <div className="mt-1">
            <a
              href='/creator'
              className="
                inline-block
                text-white/50 text-[10px]
                cursor-pointer
                transition-all duration-200
                hover:text-white/80
                hover:underline
                hover:underline-offset-2
                hover:decoration-white/60
                focus:outline-none
                focus:text-white
              "
            >
              Built by Zakaria Mohamed →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
