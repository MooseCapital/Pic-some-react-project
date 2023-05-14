function Image(props) {

    console.log(props.url)
    return (
        <div className={`${props.class} image-container`}>
            <img src={props.url} className={"image-grid"} alt=""/>
        </div>
    )
}

export default Image
