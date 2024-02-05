'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaTiktok } from 'react-icons/fa';
import { TbBrandFacebook, TbBrandInstagram, TbBrandWhatsapp } from 'react-icons/tb';

import AnchorComponent from '@/components/utils/anchor';
import { ImageComponent } from '@/components/utils/image';
import { AnimatedVerticalComponent } from '../utils/animatedVertical';

export function FooterComponent() {
  const { push } = useRouter();
  const pathName = usePathname();

  if (pathName.includes('dashboard')) {
    return <> </>;
  }

  return (
    <footer className="flex flex-col items-center justify-center w-full pb-10 md:pb-0 bg-zinc-900 md:items-start gap-y-4">
      <div className="flex flex-col items-center justify-center w-full md:h-[138px]  text-white  md:flex-row md:justify-between overflow-hidden  relative">
        <div className="relative ">
          <ImageComponent
            alt={'logo-branco'}
            h={'h-[80px] md:h-[100px] '}
            w={'w-[220px] md:w-[320px]'}
            src={"https://res.cloudinary.com/dcjkvwbvh/image/upload/v1699297655/vpyhnm1o0zsfsj8httyz.png"}
            containerClassname="z-30 absolute md:ml-5"
          />
          <div className="hidden md:flex md:absolute md:-mt-[120px]">
            <ImageComponent
              alt={'logo-branco'}
              h={'h-[138px]'}
              w={'w-full md:w-[499px]'}
              src={'/assets/images/faixadaImage.png'}
              containerClassname="z-20"
            />
          </div>
        </div>
        <div className="flex mt-10 mr-5 gap-x-2 md:mt-0 ">
          <AnchorComponent
            href="https://api.whatsapp.com/send/?phone=351910452428&text&type=phone_number&app_absent=0"
            icon={
              <TbBrandWhatsapp
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /* bgColor="bg-[#FF5A5F]" */
          />
          <AnchorComponent
            href="https://www.facebook.com/profile.php?id=100085832906065"
            icon={
              <TbBrandFacebook
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /*    bgColor=" bg-[#3b5998]" */
          />
          <AnchorComponent
            href="https://www.tiktok.com/@ar756_"
            icon={
              <FaTiktok
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /*    bgColor=" bg-[#3b5998]" */
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandInstagram
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /* bgColor="bg-insta-gradient" */
          />
        </div>
        </div>
    </footer>
  );
}
