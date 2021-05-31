import React from 'react';

const ContactC = () => {
    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <h1 className="subtitle">CONTACT</h1>
                </div>
                <div className="form-div">
                    <form className="contact-form">
                        <div className="subject-line">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">Subject</label>
                            <input type="text" name="subject" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">Message</label>
                            <textarea name="message" rows="10" required></textarea>
                        </div>
                        <div className="form-button-div text-center">
                            <button type="submit" className="btn form-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactC;