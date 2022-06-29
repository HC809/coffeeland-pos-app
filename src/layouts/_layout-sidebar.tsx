import cn from 'classnames';
import routes from '@/config/routes';
import Logo from '@/components/ui/logo';
import ActiveLink from '@/components/ui/links/active-link';
import { CloseIcon } from '@/components/icons/close-icon';
import { useDrawer } from '@/components/drawer-views/context';
import Scrollbar from '@/components/ui/scrollbar';
import Copyright from '@/layouts/_copyright';
import { BiStore } from 'react-icons/bi';
import { FcCancel, FcViewDetails } from 'react-icons/fc';
import { GrUnorderedList } from 'react-icons/gr';
import { BiPrinter, BiInfoCircle } from 'react-icons/bi';
import { BiEdit } from 'react-icons/bi';
import Button from '@/components/ui/button';
import { useModalAction } from '@/components/modal-views/context';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectNewOrder } from '../store/newOrderSlice';

interface NavLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  isCollapse?: boolean;
}

function NavLink({ href, icon, title, isCollapse }: NavLinkProps) {
  return (
    <ActiveLink
      href={href}
      className="my-0.5 flex items-center gap-1 px-4 py-3 hover:bg-light-300 hover:dark:bg-dark-300 xs:px-6 sm:my-1 sm:gap-1.5 sm:px-7 lg:gap-2 xl:my-0.5"
      activeClassName="text-dark-100 active-text-dark dark:active-text-light dark:text-light-400 font-medium bg-light-400 dark:bg-dark-400 hover:bg-light-600 hover:dark:bg-dark-500"
    >
      <span
        className={cn(
          'flex flex-shrink-0 items-center justify-start',
          isCollapse ? 'w-8 xl:w-auto' : 'w-auto xl:w-8'
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          'text-dark-100 dark:text-light-400',
          isCollapse ? 'inline-flex xl:hidden' : 'hidden xl:inline-flex'
        )}
      >
        {title}
      </span>
    </ActiveLink>
  );
}

export function Sidebar({
  isCollapse,
  className = 'hidden sm:flex fixed bottom-0 z-20 pt-[82px]',
}: {
  isCollapse?: boolean;
  className?: string;
}) {
  const { openModal } = useModalAction();
  const { newOrderInfo } = useAppSelector(selectNewOrder);

  return (
    <aside
      className={cn(
        'h-full flex-col justify-between overflow-y-auto border-r border-light-400 bg-light-100 text-dark-900 dark:border-0 dark:bg-dark-200',
        isCollapse ? 'sm:w-60 xl:w-[75px]' : 'sm:w-[75px] xl:w-60',
        className
      )}
    >
      <Scrollbar className="h-full w-full">
        <div className="flex h-full w-full flex-col">
          <nav className="flex flex-col">
            <NavLink
              title={'Inicio'}
              href={routes.productsSearch}
              isCollapse={isCollapse}
              icon={<BiStore className="h-4 w-4 text-current" />}
            />
            <NavLink
              title={'Ventas'}
              href={routes.sales}
              isCollapse={isCollapse}
              icon={<GrUnorderedList className="h-4 w-4 text-current" />}
            />
            <NavLink
              title={'Inf. Fiscal'}
              href={routes.taxInfo}
              isCollapse={isCollapse}
              icon={<BiInfoCircle className="h-4 w-4 text-current" />}
            />
            <NavLink
              title={'Impresora'}
              href={routes.configPrinter}
              isCollapse={isCollapse}
              icon={<BiPrinter className="h-4 w-4 text-current" />}
            />
            {/* <NavLink
              title={'Actualizar Información'}
              href={routes.productsSearch}
              isCollapse={isCollapse}
              icon={<BiStore className="h-4 w-4 text-current" />}
            /> */}
          </nav>

          {newOrderInfo.started && (
            <div className="mt-auto content-start pl-5">
              <div className="pb-1">
                <Button
                  onClick={() => openModal('NEW_ORDER_VIEW')}
                  variant="text"
                  className="text-sm text-gray-600 dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-gray-500 md:h-[52px]"
                >
                  {' '}
                  <BiEdit size={25} />
                  Editar Venta
                </Button>
              </div>

              <div className="pb-1">
                <Button
                  onClick={() => alert('Detalle Venta')}
                  variant="text"
                  className="text-sm text-gray-600 dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-gray-500 md:h-[52px]"
                >
                  {' '}
                  <FcViewDetails size={25} />
                  Detalle Factura
                </Button>
              </div>

              <Button
                onClick={() => openModal('CANCEL_NEW_ORDER_VIEW')}
                variant="text"
                className="text-sm text-gray-600 dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-dark-200 dark:hover:text-gray-500 md:h-[52px]"
              >
                {' '}
                <FcCancel size={25} />
                Cancelar Venta
              </Button>
            </div>
          )}
        </div>
      </Scrollbar>

      <footer
        className={cn(
          'flex-col border-t border-light-400 pt-3 pb-4 text-center dark:border-dark-400',
          isCollapse ? 'flex xl:hidden' : 'hidden xl:flex'
        )}
      >
        <Copyright className="text-xs font-medium text-dark-800/80 dark:text-dark-700" />
      </footer>
    </aside>
  );
}

export default function SidebarDrawerView() {
  const { closeDrawer } = useDrawer();
  return (
    <>
      <div className="flex h-[70px] items-center justify-between py-2 px-5 xs:px-7">
        <Logo />
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            className="-m-2 p-2 text-dark-900 outline-none transition-all hover:text-dark dark:text-dark-800 hover:dark:text-light-200"
            onClick={closeDrawer}
          >
            <span className="sr-only">Close panel</span>
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Sidebar isCollapse={true} className="flex text-13px" />
    </>
  );
}
