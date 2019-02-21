const React = require('react');
const Fragment = React.Fragment;
const Page = require('./Page');
const MatchForm = require('./MatchForm');

class UploadForm extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Player Upload</h2>
                <form
                    action="/upload"
                    method="post"
                    encType="multipart/form-data"
                >
                    <input name="js" type="file" />
                    <input name="submit" type="submit" />
                </form>
            </Fragment>
        );
    }
}

class MainPage extends React.Component {
    render() {
        return (
            <Page>
                <MatchForm key="matchForm" players={this.props.players} />
                <UploadForm key="uploadForm" />
            </Page>
        );
    }
}

module.exports = MainPage;
