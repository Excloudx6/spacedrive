import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Modal } from '~/components/layout/Modal';
import { Button } from '~/components/primitive/Button';
import { useLibraryMutation } from '~/hooks/rspc';
import tw from '~/lib/tailwind';

const ImportModal = forwardRef<BottomSheetModal, unknown>((_, ref) => {
	const { mutate: createLocation } = useLibraryMutation('locations.create');

	const handleDirectorySelection = useCallback(async () => {
		try {
			const response = await DocumentPicker.pickDirectory({
				presentationStyle: 'pageSheet'
			});
			// TODO: Make sure location doesn't already exist!
			createLocation({
				path: response.uri.replace('file://', '').replaceAll('%20', ' '), //TODO: Parse path better...
				indexer_rules_ids: []
			});
		} catch (err) {
			// TODO: TOAST msg
			// console.warn(err);
		}
	}, [createLocation]);

	return (
		<Modal ref={ref} snapPoints={['20%']}>
			<View style={tw`flex-1 p-4 bg-gray-600`}>
				<Button size="md" variant="primary" style={tw`my-2`} onPress={handleDirectorySelection}>
					<Text>Import from Files</Text>
				</Button>
				<Button size="md" variant="primary" style={tw``}>
					<Text>Import from Photos</Text>
				</Button>
			</View>
		</Modal>
	);
});

export default ImportModal;
