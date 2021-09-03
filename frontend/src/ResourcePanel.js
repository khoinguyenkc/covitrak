import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function ResourcePanel() {
    return (
        <div>
                <Card >
                    <CardContent className="resource__panel">
                    {/* <div class="resourcepanel__left">
 */}
<h2>Resources</h2>
<p><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">WHO - World Health Organization</a></p>
<p><a href="https://covid19.nih.gov/">NIH - National Institutes of Health</a></p>
<p><a href="https://www.cdc.gov/">CDC - Centers for Disease Control and Prevention</a></p>
{/* </div> */}

{/* <div class="resourcepanel__right">
                                <img class="resourcepanel__graphic" src="https://images.unsplash.com/photo-1547082688-9077fe60b8f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"></img>

            </div> */}

                    </CardContent>
                </Card>    
    
    </div>
    )
        
}

export default ResourcePanel
