import BasicMenu from "./BasicMenu";
import { setMessage } from "../../stores/chat/chat";
import { forwardRef } from "react";
import { ButtonBase } from "@mui/material";

const Message = forwardRef(({ msg, handleShowOldReply }, ref) => {

    return (
        <div ref={ref} className={msg.isSender ? 'flex justify-end flex-start gap-4' : 'flex flex-start gap-4'}>
            {!msg.isSender && (
                <img className="w-10 h-10 rounded-full" src={msg.sender.avatar} alt="Rounded avatar" />
            )}
            <div className='relative'>
                <div className='absolute top-0 text-xs right-0'>{msg.created_at}</div>
                <div className="text-xs">{(msg.group_id != '') ? msg.sender.name : ''}</div>
                <div className="my-6 w-fit">
                    <div className='flex items-center gap-2 justify-between  px-2 py-0.5 rounded text-sm bg-white border '>
                        <div>
                            <div className={msg.is_deleted ? 'italic text-xs' : ''}>{msg.message}</div>

                        </div>

                        <div className='relative'>
                            {

                                <BasicMenu is_edited={msg.is_edited} msg={msg} is_deleted={msg.is_deleted} />
                            }
                        </div>

                    </div>

                    {
                        msg?.reply?.message && (
                            <ButtonBase className="w-full">
                                <div onClick={() => handleShowOldReply(msg?.reply?.id)} className="bg-slate-200 rounded-bl-md text-sm w-full border-l-2 border-blue-300 text-left px-1">
                                    {msg?.reply?.message}
                                </div>
                            </ButtonBase>
                        )
                    }
                </div>
                {!msg.is_deleted &&
                    <div className='absolute bottom-1 right-0 text-xs' >{msg.is_edited ? 'message edited' : ''}</div>
                }
            </div>
        </div>
    );
});


export default Message