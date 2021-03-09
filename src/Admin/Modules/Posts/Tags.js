import React from "react";
import ReactTooltip from "react-tooltip";
import uniqueID from "react-id-generator"


function Tags(props) {
    var tagsArr = []
    var counter = 0
    var tooltipArr = []
    var countTags = props.tags.length
    const id = uniqueID()

    props.tags.map((el, i) => {
        counter += 1 
        if(counter <= 2){
            tagsArr.push(<span key={i} className="badge rounded-pill bg-dark px-3 py-2 me-1">{el}</span>)
        }else{
            if(countTags > 3){
                tooltipArr.push(el)
            }else{
                tagsArr.push(<span key={i} className="badge rounded-pill bg-dark px-3 py-2 me-1">{el}</span>) 
            }
        }
        return null
    })

    tagsArr.push(
        countTags > 3 &&
        <React.Fragment key={id} >
            <span data-tip={tooltipArr.join(", ")} data-for={id} className="badge rounded-pill bg-dark px-3 py-2 me-1" >...</span>
            <ReactTooltip multiline={true} id={id} place="right" effect="solid"></ReactTooltip>
        </React.Fragment> 
    )

    return tagsArr
}
 
export default Tags;