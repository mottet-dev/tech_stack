import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableWithoutFeedback,
	LayoutAnimation,
	NativeModules
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './commun';
import * as actions from '../actions';
const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class ListItem extends Component {
	componentWillUpdate() {
		LayoutAnimation.spring();
	}

	renderDescription(){
		const { library, expanded } = this.props;
		const { description } = library; 

		if (expanded){
			return (
				<CardSection>
					<Text style={{flex: 1}}>
						{description}
					</Text>
				</CardSection>
			);
		}
	}

	render() {
		const { title, id } = this.props.library;
		const { titleStyle } = styles;

		return (
			<TouchableWithoutFeedback 
				onPress={() => this.props.selectLibrary(id)}
			>
				<View>
					<CardSection>
						<Text style={titleStyle}>
							{title}
						</Text>
					</CardSection>
					{this.renderDescription()}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle:{
		fontSize: 18,
		paddingLeft: 15
	}
};

const mapStateToProps = (state, ownProps) => {
	const expanded = state.selectedLibraryId === ownProps.library.id;
	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);