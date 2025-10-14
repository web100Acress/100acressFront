import {useState,useEffect} from 'react'
import { MessageSquare } from 'lucide-react';
import { Modal } from "antd";
import axios from 'axios';


function NoPropertiesMessage () {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Share your requirements with us, and our expert team will help you find the perfect property.');

    const [modal, contextHolder] = Modal.useModal();


    const [enquiry,setEnquiry] = useState({
        name:"",
        mobile:"",
        message:""
    });

    const [ validationError , setValidationError ]= useState({
        name:"",
        mobile:"",
    });
    const [isFormValid, setIsFormValid] = useState(false);

      useEffect(() => {
        const { name, mobile, email } = enquiry;
        const noErrors = Object.values(validationError).every(error => error === "");
        if ((!name || !mobile || !email ) || !noErrors) {
          setIsFormValid(false);
        } else {
          setIsFormValid(true);
        }
      }, [enquiry, validationError]);


    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async() => {
        const {name, mobile,message} = enquiry;
        console.log(enquiry);
        if (!name || !mobile) {
            const title = "Error";
            const content = "Please fill all the fields so that our team can contact you.";
            PopUpModal({title,content,type:"error"});
            return;
        }  
        try {
            setConfirmLoading(true);
            const response = await axios.post("/contact_Insert",enquiry)
            const title = "Success";
            const content = "Your Form has been submitted successfully, Our team will reach out to you as soon as possible!";
            setConfirmLoading(false);
            PopUpModal({title,content,type:'success'})
            setOpen(false);
        } catch (error) {
            setConfirmLoading(false)
            const title = "Error";
            const content = "Something went wrong ;-(";
            PopUpModal({title,content,type:"error"});
            setOpen(false);
        }
    };
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };


      const validateField = (name, value) => {
        let errorMessage = "";
        
        switch (name) {
          case "name":
            if (!value) {
              errorMessage = "Name is required";
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
              errorMessage = "Please enter a valid full name";
            }
            break;
          case "mobile":
            if (!value) {
              errorMessage = "Mobile number is required";
            } else if (!/^\d{10}$/.test(value)) {
              errorMessage = "Please enter a valid 10-digit mobile number";
            }
            break;
          default:
            break;
        }
        return errorMessage;
      };

      const handleChange = (e) =>{
            const {name,value} =  e.target;;
            setEnquiry((prev=>({
                    ...prev,
                    [name]:value
            })));
            const errorMessage = validateField(name, value);
            setValidationError(prev=>({
                ...prev,
                [name]:errorMessage
            }));

      }


      const PopUpModal = ({title,content,type}) => {
        let secondsToGo = 2;

        if(type === "error"){
            const instance = modal.error({
              title: title,
              content: content,
              okButtonProps:{className:'hidden'}
            });
            setTimeout(() => {
                instance.destroy();
              }, secondsToGo * 1000);
        }

        if(type === "success"){
            const instance = modal.success({
                title: title,
                content: content,
                okButtonProps:{className:'hidden'}
            });
            setTimeout(() => {
                instance.destroy();
              }, secondsToGo * 1000);
        }

      };

  return (
    <>
    {contextHolder}
    <Modal
        title="Let's Find Your Dream Property"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{className:"custom-ok-button"}}
        cancelButtonProps={{className:"custom-cancel-button"}}
        okText={"Submit"}
      >
        <p>{modalText}</p>
        <form>
            <div>
                <label for="name" className='block'>Full Name</label>
                <input type="text" name='name' id='name' placeholder='Please enter your full name.' className='border p-2 w-full rounded' onChange={handleChange}/>
            </div>
            <div>
                <label for="mobile" className='block'>Phone Number</label>
                <input type="number" name='mobile' id='mobile' placeholder='Please enter your mobile number.' className='border p-2 w-full rounded' onChange={handleChange}/>
            </div>
            <div>
                <label for="message" className='block'>message</label>
                <textarea name="message" id="message" rows={3} placeholder='Enter your message' className='border p-2 w-full rounded' onChange={handleChange}></textarea>
            </div>
        </form>

      </Modal>
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded mt-20">
        <div className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
            <MessageSquare className="w-12 h-12 text-primaryRed" />
            
            <p className="text-gray-700">
               We'd love to help you find your perfect property match.
            </p>
            
            <button 
                onClick={showModal}
                className="bg-primaryRed/80 hover:bg-primaryRed text-white w-1/2 p-2 rounded"
                >
                Contact Our Team
            </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default NoPropertiesMessage 