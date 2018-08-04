import React from "react";
import Layout from "../../../components/Layout";
import { Link }  from "../../../routes";
import { Button } from "semantic-ui-react";

class RequestIndex extends React.Component{

    static async getInitalProps(props){
        const { address } = props.query;

        return { address };
    }

    render(){
        return(
            <Layout>
                <h3>Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Requests</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
};

export default RequestIndex;