import React from "react";
import factory from "../ethereum/factory";
import { Card } from "../node_modules/semantic-ui-react";


class CampaignIndex extends React.Component {

    // Fetching props from server...
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();

        return { campaigns };
    }

    renderCampaign(){
        const items = this.props.campaigns.map((address)=>{
            return {
                header: address,
                description: <a>View Details</a>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render(){
        return <div>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
            {this.renderCampaign()}
        </div>
    }

}

export default CampaignIndex;