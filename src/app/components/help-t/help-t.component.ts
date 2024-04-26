/*import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { WebRTC } from 'ngx-webrtc';

declare var apiRTC: any;

@Component({
  selector: 'app-help-t',
  templateUrl: './help-t.component.html',
  styleUrls: ['./help-t.component.css']
})
export class HelpTComponent {

  constructor(private ngZone: NgZone,  private webrtc: WebRTC) 
 { }
 async callForHelp() {
  try {
    const stream = await this.webrtc.getUserMedia({ video: true, audio: true });
    const offer = await this.webrtc.createOffer(stream);
    // Send the offer to the server for further processing
  } catch (error) {
    console.error('Error during WebRTC call:', error);
  }
}
  callForHelp(): void {
    // Initialize the UserAgent
    const ua = new apiRTC.UserAgent({ uri: 'apirtc:arbi.ferchichi53@gmail.com	' });
  
    this.ngZone.run(() => {
      ua.register({
        password: '5c12d59ed716395b7954fc7d7680f02a'
      })
      .then((session: any) => {
        // OK : UserAgent is connected to the ApiRTC platform
  
        // Create a conversation
        const conversation = session.getConversation('help');
  
        // Add event listeners for stream changes
        conversation.on('streamListChanged', (streamInfo: any) => {
          if (streamInfo.listEventType === 'added' && streamInfo.isRemote === true) {
            this.ngZone.run(() => {
              conversation.subscribeToMedia(streamInfo.streamId)
                .then((stream: any) => {
                  console.log('Subscribed to remote stream:', stream);
                  // Handle subscription to remote stream
                }).catch((error: any) => {
                  console.error('Error subscribing to remote stream:', error);
                });
            });
          }
        });
  
        // Join the conversation
        conversation.join().then(() => {
          // Create a local stream
          ua.createStream({ audio: true, video: true }).then((localStream: any) => {
            // Publish the local stream
            conversation.publish(localStream).then(() => {
              // Handle successful publishing
              console.log('Local stream published:', localStream);
            }).catch((error: any) => {
              console.error('Error publishing local stream:', error);
            });
          }).catch((error: any) => {
            console.error('Error creating local stream:', error);
          });
        }).catch((error: any) => {
          console.error('Error joining conversation:', error);
        });
      }).catch((error: any) => {
        console.error('Error registering UserAgent:', error);
      });
    });
  }
}*/