import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const Share = (props) => {
	return (
		<div className="card-footer">
			<span style={{ marginRight: '10px' }}>Share On:</span>
			<FacebookShareButton className="share__icon" url={props.url} quote={props.quote}>
				<FacebookIcon size={30} round={true} />
			</FacebookShareButton>
			<TwitterShareButton className="share__icon" url={props.url} quote={props.quote}>
				<TwitterIcon size={30} round={true} />
			</TwitterShareButton>
			<WhatsappShareButton className="share__icon" url={props.url} quote={props.quote}>
				<WhatsappIcon size={30} round={true} />
			</WhatsappShareButton>
		</div>
	);
};

export default Share;
