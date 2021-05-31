import React from 'react';

const AdminUpdateC = () => {
    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <h1 className="subtitle">ADMIN</h1>
                </div>
                <div className="admin-item-div">
                    <div className="admin-image-div">
                        <div className="image">
                            <div className="big-image-div">
                                <img className="big-image" src="" alt="item"/>
                            </div>
                        </div>
                    </div>
                    <form action="/routes/admin.js" method="POST">
                        <div className="admin-form">
                            <label></label>
                            <h1 className="form-title">Update</h1>
                        </div>
                        <div className="admin-form">
                            <label>Title</label>
                            <input type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <div>
                                <label className="radio-label">Type:</label>
                            </div>
                            <div className="radio-div">
                                <label className="radio">Comic</label>
                                <input type = "radio" name = "product" required/>
                                <label className="radio">Print</label>
                                <input type = "radio" name = "product"/>
                                <label className="radio">Personal</label>
                                <input type = "radio" name = "product"/>
                            </div>
                        </div>
                        <div className="admin-form">
                            <label>Price</label>
                            <input type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <label>Info</label>
                            <textarea name="message" rows="5" required></textarea>
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

export default AdminUpdateC;