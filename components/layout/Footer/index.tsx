import Mail from '@/public/icons/mail.svg';
import Instagram from '@/public/icons/instagram.svg';
import Facebook from '@/public/icons/facebook.svg';

export default function Footer() {
  return (
    <div className="text-gray400 text-regular12 flex flex-col items-center justify-center gap-5 bg-black p-20 md:flex-row md:justify-between">
      <span>©codeit - 2023</span>
      <div className="flex gap-5">
        <span>Privacy Policy</span>
        <span>FAQ</span>
      </div>
      <div className="mt-10 flex gap-[14px] md:mt-0">
        <Mail />
        <Instagram />
        <Facebook />
      </div>
    </div>
  );
}
