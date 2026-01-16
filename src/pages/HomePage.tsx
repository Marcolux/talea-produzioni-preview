import "./page.scss" 
import TimeLineStory from "../components/TimelineStory/TimelineStory"

const HomePage = () => {

    return(
        <div className="page">
            <h1>HOME PAGE</h1>

            <h4>Time Line Story</h4>
            <TimeLineStory className="my-20"/>
        </div>
    )
}

export default HomePage