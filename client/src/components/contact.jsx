import React, {useState} from 'react';
import CollectionAPI from "../apis/collectionAPI";

const ContactC = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await CollectionAPI.post("/contact", {
                name: name,
                email: email,
                subject: subject,
                message: message
            })
             
        }catch(err){

        }
    }

    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <p className="nav-title">contact</p>
                </div>
                <div className="form-div">
                    <form className="contact-form" method="POST" action="/contact">
                        <div className="subject-line">
                            <label className="form-label">name</label>
                            <input type="text" onChange={e => setName(e.target.value)} name="name" className="form-control"/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">email</label>
                            <input type="email" onChange={e => setEmail(e.target.value)} name="email" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">subject</label>
                            <input type="text" onChange={e => setSubject(e.target.value)} name="subject" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">message</label>
                            <textarea name="message" onChange={e => setMessage(e.target.value)} rows="10" required></textarea>
                        </div>
                        <div className="form-button-div text-center">
                            <button onClick={handleSubmit} type="submit" className="btn form-button">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactC;