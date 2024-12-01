import { useSearchParams } from "react-router-dom";

function ShowFrame() {
    let [searchParams] = useSearchParams();
    const url = searchParams.get("q");

    return <iframe id="miIframe" src={`public/${url}`} />;
    // return <></>;

}

export default ShowFrame;
