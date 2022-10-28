import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {addComment} from '../api/api';
import VacationItem from './VacationItem';

const VacationDetail = (props) => {
    const { token, vacation, getVacations } = props;
    const { vacationId } = useParams();
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const singleVacation = vacation.find((oneVacation) => {
        const foundVacation = oneVacation.id == vacationId;
        return foundVacation;
    });

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const { success, error, comment } = await addComment(token, vacationId, commentText);

        if (success) {
            // only clear input if api call worked
            setCommentText('');
            
            console.log('we successfully added a comment!');

            // refresh all vacations to get new comment
            await getVacations();
        } else {
            setErrorMessage(error);
            console.log('failed to add a comment');
        }
    };

    if (!singleVacation) {
        return <p>Loading...</p>;
    }

    return (<>
        <VacationItem vacation={singleVacation} />
        <form className="comment-form" onSubmit={handleOnSubmit}>
            <input type="text" placeholder="New Comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}/>
            <button type="submit">Send</button>
            {errorMessage ? 
                <p style={{color: 'red', backgroundColor: 'pink'}}>Operation Failed: {errorMessage}</p>
                : null}
        </form>
    </>);
};

export default VacationDetail;
