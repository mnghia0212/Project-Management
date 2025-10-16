import React from 'react'
import BaseModal from './BaseModal'
import QuickTaskForm from '../forms/QuickTaskForm'

const QuickTaskModal = ({ isOpen, isLoading, close, onSubmit }) => {
	if( !isOpen ) return null;

	return (
	<BaseModal title={"Quick Task"} isOpen={isOpen} close={close}>
		<QuickTaskForm isLoading={isLoading} onSubmit={onSubmit}/>
	</BaseModal>
	)
}

export default QuickTaskModal