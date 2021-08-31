import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function ResourcePanel() {
    return (
        <div class="resource__panel">
            <div class="resourcepanel__left">
                <Card className="card">
                    <CardContent>
<h2>Resources</h2>
<a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"><Typography >WHO - World Health Organization</Typography></a>
<a href="https://covid19.nih.gov/"><Typography >NIH - National Institutes of Health</Typography></a>
<a href="https://www.cdc.gov/"><Typography > CDC - Centers for Disease Control and Prevention</Typography></a>
                    </CardContent>
                </Card>    
                </div>
            <div class="resourcepanel__right">
                                <img class="resourcepanel__graphic" src="https://images.unsplash.com/photo-1547082688-9077fe60b8f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"></img>

            </div>
    
    </div>
    )
        
}

export default ResourcePanel
