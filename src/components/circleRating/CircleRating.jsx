/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";
	
const CircleRating = ({ rating }) => {
    let maxValue = 10
    if (rating > 10) {
        maxValue = 300
    }
    return (
        <div className="circleRating">
            <CircularProgressbar
                value = {rating}
                maxValue = {maxValue}
                text = {rating}
                styles={buildStyles({
                    pathColor: rating < maxValue*0.3 ? "red" : rating < maxValue*0.7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default CircleRating