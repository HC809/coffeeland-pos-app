import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import { DRAWER_VIEW, useDrawer } from '@/components/drawer-views/context';

const CartDrawerView = dynamic(
  () => {
    return import('@/components/cart/cart-drawer-view');
  },
  { ssr: false }
);
const SidebarDrawerView = dynamic(() => import('@/layouts/_layout-sidebar'));

function renderDrawerContent(view: DRAWER_VIEW | string) {
  return <CartDrawerView />;
}

export default function DrawersContainer() {
  const router = useRouter();
  const { view, isOpen = true } = useDrawer();

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="fixed overflow-hidden" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed cursor-pointer" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed inset-y-0 right-0 flex w-3/12 pt-5">
            <div className="w-screen max-w-md pt-5">
              <div className="flex h-full flex-col bg-light pt-5 shadow-xl">
                {view && renderDrawerContent(view)}
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
