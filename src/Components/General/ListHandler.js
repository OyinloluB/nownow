import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneIcon from "@material-ui/icons/Phone";
import AllOutIcon from '@material-ui/icons/AllOut';
import BlurOffRoundedIcon from '@material-ui/icons/BlurOffRounded';

class ListHandler extends Component {
    state = {  }

    render() { 
        return ( 
            <React.Fragment>
                <Modal isOpen = { this.props.myState.modalSwitch } onHide={this.props.closeModal}>
                    <ModalHeader style={{ color: "white", background: "#b11917" }} className="p-3 m-1">
                        <AllOutIcon/><AllOutIcon /> Nearby Customers <AllOutIcon /><AllOutIcon />
                    </ModalHeader>

                    <ModalBody style={{'maxHeight': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <table className="table table-borderless text-justify col-12">
                        {    
                            this.props.myState.user_data.slice(1, 20).map(function (data, index) {
                                return <tr key={index} className="row" style={{ borderBottom: "1px solid grey"}}><td style={{ color: "grey", fontSize:"14px" }} className="mb-1 pb-1 col-8">{data.name}</td><td><a href={`https://wa.me/${data.phone}`} target="_blank"><WhatsAppIcon style={{ color: "grey", fontSize: 20 }} /></a></td><td><a href={`tel:${data.phone}`} target="_blank"><PhoneIcon style={{ color: "grey", fontSize: 20 }} /></a></td></tr>
                            })
                        }
                        </table>
                    </ModalBody>     

                    <ModalFooter>
                        <button className="btn" style={{ background: "#b11917", color: "white" }} onClick={this.props.closeModal}><BlurOffRoundedIcon /> Away</button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
         );
    }

}
 
export default ListHandler;