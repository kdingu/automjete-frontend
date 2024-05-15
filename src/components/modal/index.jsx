import React from "react"
import Button from "@/components/button";

const Modal = ({
                   title,
                   description,
                   cancel,
                   cancelText = 'Cancel',
                   submit,
                   submitText = 'Submit',
                   submitDisabled = false,
                   children
               }) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="">
                                <div className="mt-3 sm:mt-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        {children ?
                                            children
                                            :
                                            <p className="text-sm text-gray-500">{description}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button onClick={() => submit()} disabled={submitDisabled}>{submitText}</Button>
                            {cancel && <Button variant="outline" className="mr-2"
                                               onClick={() => cancel()}>{cancelText}</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;
