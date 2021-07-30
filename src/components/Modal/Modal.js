import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const ModalRoot = document.querySelector("#modal-root");

export default function ModalHooks({ onClose, image }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.code !== "Escape") {
      return;
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div
      className={s.Overlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={s.Modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    ModalRoot
  );
}

// export default class Modal extends Component {
//   backdrop = createRef();

//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { image } = this.props;
//     return createPortal(
//       <div
//         className={s.overlay}
//         ref={this.backdrop}
//         onClick={this.handleBackdropClick}
//       >
//         <div className={s.modal}>
//           <img src={image.src} alt={image.alt} />
//           {this.props.children}
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
