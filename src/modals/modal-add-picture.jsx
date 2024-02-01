const ModalAddPicture = ({add_pic}) => {
    const imageURL = URL.createObjectURL(add_pic);

    return(
        <div className="m-5 flex flex-col items-center object-contain">
            <img src={imageURL} className=" h-96 rounded-xl object-contain"/>
        </div>
    )
}

export default ModalAddPicture;