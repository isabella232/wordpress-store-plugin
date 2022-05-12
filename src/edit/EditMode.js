import { Icon } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import './EditMode.scss';
import StorePicker from './StorePicker';
import { jotformIcon, jfTrashIcon } from '../assets/Icons';
import jotformStorePluginImage from '../assets/jotform-store-plugin-preview.png';

const EditMode = ({ attributes, setAttributes }) => {
	const { storeId, storeTitle, storeIcon, blockPreview } = attributes;
	const storeExists = !!(storeId && storeTitle && storeIcon);
	const blockProps = useBlockProps();

	const handleStoreSelection = (storeData) => {
		if (storeData) {
			setAttributes({
				storeId: storeData.id,
				storeTitle: storeData.title,
				storeIcon: storeData.icon,
			});
		}
	};

	const handleStoreRemove = () => {
		setAttributes({
			storeId: null,
			storeTitle: null,
			storeIcon: null,
		});
	};

	const handleStoreRemoveByKey = (e) => {
		if (e.keyCode === 13) {
			handleStoreRemove();
		}
	};

	if (blockPreview) {
		return (
			<img
				src={jotformStorePluginImage}
				alt="Jotform Store Plugin Preview"
				style={{ width: '100%' }}
			/>
		);
	}

	return (
		<div {...blockProps}>
			<div className="components-placeholder wp-block-embed is-large">
				<div className="components-placeholder__label">
					<span className="block-editor-block-icon has-colors">
						<Icon icon={jotformIcon} />
					</span>
					Jotform Store Embed
				</div>
				{!storeExists && (
					<>
						<div className="components-placeholder__instructions">
							Select a store to embed to your site.
						</div>
						<div className="components-placeholder__fieldset">
							<StorePicker onStoreSelect={handleStoreSelection} />
						</div>
					</>
				)}
				{storeExists && (
					<div className="components-placeholder__fieldset">
						<div className="preview-area">
							<div className="preview-area-icon">
								<img alt="Store Icon" src={storeIcon} />
							</div>
							<div className="preview-area-text">
								{storeTitle}
							</div>
							<div
								className="preview-area-button"
								onClick={handleStoreRemove}
								onKeyDown={handleStoreRemoveByKey}
								role="button"
								tabIndex="0"
							>
								<Icon icon={jfTrashIcon} />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditMode;
