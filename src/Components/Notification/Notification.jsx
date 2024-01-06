import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = {
  success: (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  },
};

export default Notification;