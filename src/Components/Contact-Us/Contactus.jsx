import parse,{ domToReact } from 'html-react-parser'

import React from 'react'

const ContactTitle = ({data}) => {

    const options = {
        replace : (domNode)=>{
            if(domNode.name == "h2"){
                return(
     <h2 className='text-[32px] font-medium text-[] '>
            {domToReact(domNode.children,options)}
        </h2>
                )
            }
        }
    }

  return (

        <div className='py-[96px] text-center text-[var(--secondryClr)] '>
        {
            data && parse(data,options)
        }
    </div>


  )
}

export default ContactTitle