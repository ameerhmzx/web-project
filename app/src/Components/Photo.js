import PropTypes from "prop-types";
import {useState} from "react";
import {Menu, Transition} from '@headlessui/react';
import {DotsVerticalIcon, TrashIcon} from "@heroicons/react/outline";
import {XIcon} from "@heroicons/react/solid";

//TODO: use lazy loading
export default function Photo(props) {
    const [isShowing, setShowing] = useState(true);

    function onDelete() {
        setShowing(false);
    }

    return (
        <Transition
            appear
            show={isShowing}
            enter="ease-out transform transition-all duration-300"
            enterFrom="opacity-100 scale-75"
            enterTo="opacity-100 scale-100"
            leave="ease-in transform transition-all duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
        >
            <div className={`relative image`}>
                <img
                    className={`p-px object-cover `}
                    key={props.id}
                    src={props.src}
                    onClick={props.onClick}
                    alt={props.alt}
                    width={props.width}
                    height={props.height}
                />

                <Menu as={'div'}
                      className={'absolute m-px right-0 top-0 flex items-center justify-center duration-500 menu rounded-bl-md bg-indigo-500 bg-opacity-30 hover:bg-opacity-80'}>
                    <Menu.Button className={'relative outline-none focus:outline-none'}>
                        {({open}) =>
                            <div>
                                < DotsVerticalIcon
                                    className={`duration-300 w-8 h-8 px-2 py-1 text-gray-50 transform
                            ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}/>
                                <XIcon className={`absolute top-0 left-0 duration-300 w-8 h-8 px-2 py-1 text-gray-50 transform
                            ${open ? 'rotate-90 opacity-100' : 'rotate-0 opacity-0'}`}/>
                            </div>
                        }
                    </Menu.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Menu.Items
                            className={'absolute z-30 right-0 mt-6 mr-2 origin-top-right outline-none outline-gray-300 ' +
                            'rounded-md outline-none shadow-lg bg-white py-1 flex flex-col text-gray-700'}>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        onClick={() => props.onDelete(props.id, onDelete)}
                                        className={`
                                        ${active && 'bg-red-600 text-white'} 
                                        text-sm pl-2 pr-4 py-2 whitespace-nowrap flex items-center
                                        rounded-md mx-1
                                        outline-none focus:outline-none`}>
                                        <TrashIcon className={'w-4 mx-1'}/>
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </Transition>
    );
}

Photo.prototypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    alt: PropTypes.string
};
