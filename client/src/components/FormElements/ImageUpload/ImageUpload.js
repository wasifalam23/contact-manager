import Button from '../../../utils/Button/Button';
import './ImageUpload.scss';

const ImageUpload = (props) => {
  return (
    <div className={`image-upload__container ${props.className}`}>
      <input
        id={props.id}
        type="file"
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png"
        ref={props.inputRef}
        onChange={props.inputOnChange}
      />

      <div className="image-upload__content">
        <div className="image-upload__preview">
          {props.imgSrc && (
            <img
              className="image-upload__image"
              src={props.imgSrc}
              alt="preview"
            />
          )}
          {!props.imgSrc && (
            <p className="image-upload__alter-text">Pick an Image</p>
          )}
        </div>
        <Button
          className="image-upload__btn"
          type="button"
          onClick={props.buttonOnClick}
        >
          Upload Photo
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
