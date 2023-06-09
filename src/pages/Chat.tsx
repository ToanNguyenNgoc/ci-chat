/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import 'src/assets/Chat.css';
import { useMediaQuery } from 'react-responsive';
import { useContext, useEffect } from 'react';
import { AppContext, AppContextType } from 'src/context/AppProvider';
import { PageChatLeft } from 'src/components';

export function Chat() {
   const { echo, user, subdomain } = useContext(AppContext) as AppContextType
   const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 767px)'
   })
   const params = useParams()
   useReplaceHome()
   useEffect(() => {
      if (echo) {
         // let chat: any = echo?.private(`ci.chat.demo.GENERAL`)
         let chat: any = echo?.private(`chat`)
            .subscribed(() => {
               chat.whisper('connected', {
                  user: {
                     id: user.id,
                     fullname: user.fullname,
                     avatar: user.avatar
                  }, socketId: echo?.socketId()
               })
               chat.listenForWhisper('typing', (u: any) => {
                  // console.log(u)
               })
            })
            .listen('UserOnline', (u: any) => {
               // console.log('on', u)
            })
            .listen('UserOffline', (u: any) => {
               // console.log('off', u)
            })
      }
   }, [echo, user])
   const onNavigateManager = (url: string) => {
      window.open(`https://${subdomain}.${url}`, "_blank")
   }

   return (
      <div className="col-lg-12 pt-3">
         <div className='page'>
            <div className="row">
               <div
                  className="col-md-4 col-xs-12 no-pr chat-left"
                  style={(params.id && !isDesktopOrLaptop) ? { display: 'none' } : {}}
               >
                  <div className="list-shortcuts">
                     <div className="icon-shortcut">
                        <div className='icon-shortcut_btn' onClick={() => onNavigateManager('myspa.vn')}>
                           <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                        </div>
                     </div>
                     <div className="icon-shortcut">
                        <div className='icon-shortcut_btn' onClick={() => onNavigateManager('myspa.vn/ManageUser/member_list')}>
                           <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                        </div>
                     </div>
                     <div className="icon-shortcut">
                        <div className='icon-shortcut_btn' onClick={() => onNavigateManager('myspa.vn/ManageAppointment/list')}>
                           <i className="fa fa-calendar fa-lg" aria-hidden="true"></i>
                        </div>
                     </div>
                     <div className="icon-shortcut">
                        <div className='icon-shortcut_btn' onClick={() => onNavigateManager('myspa.vn/ManageOrder/order_list')}>
                           <i className="fa fa-shopping-bag fa-lg" aria-hidden="true"></i>
                        </div>
                     </div>
                  </div>
                  <PageChatLeft echo={echo} isDesktopOrLaptop={isDesktopOrLaptop} />
               </div>
               <div
                  className="col-md-8 col-xs-12 no-pl show chat-right"
                  style={(params.id && !isDesktopOrLaptop) ? { display: 'block' } : {}}
               >
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
}
const useReplaceHome = () => {
   const navigate = useNavigate()
   const { queryParams } = useContext(AppContext) as AppContextType
   useEffect(() => {
      if (queryParams.token) { navigate('/', { replace: true }) }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return
}   