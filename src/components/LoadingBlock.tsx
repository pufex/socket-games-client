import { ImSpinner as LoadingIcon } from "react-icons/im"

type LoadingBlockProps = {
    height?: string
}

const LoadingBlock = ({
    height = "200px"
}: LoadingBlockProps) => {
    return <div 
        className="loading-block"
        style={{height}}
    >
        <LoadingIcon className="loading-block__icon"/>
    </div>
}

export default LoadingBlock
