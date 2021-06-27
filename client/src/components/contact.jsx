import React from 'react';

const ContactC = () => {
    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <p className="nav-title">contact</p>
                </div>
                <div className="form-div">
                    <form className="contact-form">
                        <div className="subject-line">
                            <label className="form-label">name</label>
                            <input type="text" name="name" className="form-control"/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">email</label>
                            <input type="email" name="email" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">subject</label>
                            <input type="text" name="subject" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">message</label>
                            <textarea name="message" rows="10" required></textarea>
                        </div>
                        <div className="form-button-div text-center">
                            <button type="submit" className="btn form-button">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactC;