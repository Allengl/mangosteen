import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
	props: {
		classPrefix: {
			type: String
		},
		selected: {
			type: String as PropType<string>,
		},
		onUpdateSelected: {
			type: Function as PropType<(name: string) => void>,
			required: false,
		},
	},
	setup: (props, context) => {
		return () => {
			const tabs = context.slots.default?.();
			if (!tabs) return () => null;
			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i].type !== Tab) {
					throw new Error('Tabs的子组件必须是Tab');
				}
			}
			const cp = props.classPrefix

			return (
				<div class={[cp + '_tabs', s.tabs]}>
					<ol class={[cp + '_tabs_nav', s.tabs_nav]}>
						{tabs.map(item => (
							<li
								class={[
									item.props?.name === props.selected ? [s.selected, cp + '_selected'] : '',
									cp + '_tabs_nav_item']}
								onClick={() => context.emit('update:selected', item.props?.name)}
							>
								{item.props?.name}
							</li>
						))}
					</ol>
					<div>{tabs.find(item => item.props?.name === props.selected)}</div>
				</div>
			);
		};
	},
});

export const Tab = defineComponent({
	props: {
		name: {
			type: String as PropType<string>,
		},
	},
	setup: (props, context) => {
		return () => <div>{context.slots.default?.()}</div>;
	},
});
