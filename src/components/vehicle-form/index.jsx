import React, {useEffect, useState} from 'react';
import Card from "@/components/card";
import Select from "@/components/select";
import TextInput from "@/components/input/text-input";
import Input from "@/components/input";
import ImageUploading from "react-images-uploading";
import {getMakes, getModels} from "@/helpers/utilities/utils";
import SvgIcon from "@/components/svg-icon";
import Button from "@/components/button";
import {groupBy} from "lodash/collection";
import SelectCheckbox from "@/components/select/select-checkbox";
import {getCategory} from "@/helpers/api/category";
import SubTitle from "@/components/sub-title";
import AccountItem from "@/components/account-item";
import {noop} from "lodash/util";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getCategories} from "@/helpers/selectors/categories";
import {connect} from "react-redux";

const validationSchema = Yup.object().shape({
	make: Yup.string().required('Duhet me sesbo!'),
	model: Yup.string().required('Duhet me sesbo!'),
	price: Yup.number().required('Duhet me sesbo!').typeError("Vetem numra kari..."),
	//name: Yup.string().required('Duhet me sesbo!'),
	//title: Yup.string().required('Duhet me sesbo!'),
	//description: Yup.string(),
})

const VehicleForm = (props) => {
	const {initialValues = {}, categories, makes, onSubmit = noop} = props;

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [categoryData, setCategoryData] = useState({attributes: []});
	const [loadingCategory, setLoadingCategory] = useState(false);

	const handleSubmit = async (values) => {
		// submit
		setIsSubmitting(true);
		await onSubmit(values, categoryData);
		setIsSubmitting(false);
	};

	const formik = useFormik({
		initialValues: {
			make: "",
			model: "",
			price: "",
			name: "",
			title: "",
			description: "",
			images: [],
			category: "",
			owner: "",
			attributeValues: {},
			...initialValues
		},
		initialErrors: {
			make: "",
			model: "",
			price: "",
			name: "",
			title: "",
			description: "",
			images: "",
			category: "",
			owner: "",
			attributeValues: {}
		},
		onSubmit: handleSubmit,
		validationSchema,
		validateOnChange: false // todo: allow this but find a way to clear error message on mount
	})

	const handleChangeImages = (imageList, addUpdateIndex) => {
		formik.setFieldValue("images", imageList);
	};

	const category = formik.values.category;
	const groupedAttributes = groupBy((categoryData?.attributes || []), "group")
	const attributeGroups = Object.keys(groupedAttributes)

	useEffect(() => {
		// set formik value owner to current user id
		if (!formik.values.owner) formik.setFieldValue("owner", props.account.id);
	}, []);

	useEffect(() => {
		const setFormikInitialValues = (attrs) => {
			attrs.forEach((attr) => {
				if (!formik.values.attributeValues[attr.code])
					formik.setFieldValue(`attributeValues.${attr.code}`, "");
			});
		};
		const handleSuccess = (res) => {
			setLoadingCategory(false);
			setCategoryData(res.data);
			setFormikInitialValues(res.data.attributes);
		};
		const handleError = (err) => {
			setLoadingCategory(false);
			console.error('getCategory handleError', {err});
		};

		if (category) {
			setLoadingCategory(true);
			getCategory(category).then(handleSuccess).catch(handleError);
		}
	}, [category]);

	const handleUpdateFormikField = (k, v) => formik.setFieldValue(k, v)

	const getComponentForAttribute = (attr) => {
		const commonProps = {
			label: `label_${attr.code}`,
			placeholder: `placeholder_${attr.code}`,
			placeholderLabel: `placeholder_${attr.code}`,
			id: `attributeValues.${attr.code}`,
			name: `attributeValues.${attr.code}`,
			value: formik.values.attributeValues[attr.code] || "",
			onChange: formik.handleChange,
			errorMessage: formik.errors[attr.code]
		};

		switch (attr.type) {
			case "TEXT":
				return (
					<TextInput {...commonProps} />
				);
			case "CHECKBOX":
				return (
					<SelectCheckbox
						{...commonProps}
						label=""
						data={[{label: attr.label, value: attr.code}]}
						onChange={handleUpdateFormikField}
					/>
				);
			case "SELECT":
				return (
					<Select
						{...commonProps}
						label=""
						data={attr.options}
					/>
				);
			case "MULTISELECT":
				return (
					<SelectCheckbox
						{...commonProps}
						multiselect
						label=""
						data={attr.options}
						onChange={handleUpdateFormikField}
						containerCssClasses="flex-wrap"
					/>
				);
			default:
				return `Type not handled: ${attr.type}`
		}
	};

	return (
		<>
			{!categoryData.id && (
				<section className="mb-10">
					<SubTitle className="md:!text-left">Pick a vehicle category</SubTitle>

					<div className="grid grid-cols-3 gap-6">
						{categories.map(ctg => (
							<AccountItem key={ctg.id} className="w-full" title={ctg.name}
													 onClick={() => formik.setFieldValue("category", ctg.id)} />
						))}
					</div>
				</section>
			)}

			{categoryData.id && (
				<div className="grid grid-cols-12 gap-4">
					<section className="col-span-4">
						<div>
							<Card className="mb-10" title="General">
								<Select
									id="make"
									name="make"
									value={formik.values.make}
									onChange={(e) => {
										formik.setFieldValue("model", "")
										formik.handleChange(e)
									}}
									label="Make"
									placeholderLabel="placeholder_make"
									data={getMakes(makes)}
									errorMessage={formik.errors.make}
								/>

								<br />

								<Select
									id="model"
									name="model"
									value={formik.values.model}
									onChange={formik.handleChange}
									label="Model"
									placeholderLabel="placeholder_model"
									data={getModels(formik.values.make, makes)}
									disabled={!formik.values.make}
									errorMessage={formik.errors.model}
								/>

								<br />

								<TextInput
									id="price"
									name="price"
									value={formik.values.price}
									onChange={formik.handleChange}
									label="Price"
									placeholder="placeholder_price"
									errorMessage={formik.errors.price}
								/>
							</Card>

							<Card className="mb-10" title="Details">
								<TextInput
									id="name"
									name="name"
									value={formik.values.name}
									onChange={formik.handleChange}
									label="Name"
									placeholder="placeholder_name"
									errorMessage={formik.errors.name}
								/>

								<br />

								<TextInput
									id="title"
									name="title"
									value={formik.values.title}
									onChange={formik.handleChange}
									label="Title"
									placeholder="placeholder_title"
									errorMessage={formik.errors.title}
								/>

								<br />

								<Input
									type="textarea"
									id="description"
									name="description"
									value={formik.values.description}
									onChange={formik.handleChange}
									label="Description"
									placeholder="placeholder_description"
									errorMessage={formik.errors.description}
								/>
							</Card>

							<Card className="mb-10" title="Images">
								<ImageUploading
									multiple
									value={formik.values.images}
									onChange={handleChangeImages}
									maxNumber={10}
									dataURLKey="data_url"
								>
									{({
											imageList,
											onImageUpload,
											onImageRemoveAll,
											onImageUpdate,
											onImageRemove,
											isDragging,
											dragProps,
										}) => (
										// write your building UI
										<div className="">
											<div className="flex gap-1 justify-between">
												<button
													className="group hover:border-teal hover:text-teal transition flex justify-center items-center px-4 h-[40px]"
													onClick={onImageUpload}
												>
													<span className="mr-2">Add</span>
													<SvgIcon name="plus" className="group-hover:fill-teal transition" />
												</button>
												{imageList.length > 0 && (
													<button
														className="group hover:text-red-400 transition flex justify-center items-center px-4 h-[40px]"
														onClick={onImageRemoveAll}
													>
														<span className="mr-2">Remove all</span>
														<SvgIcon name="close" className="group-hover:fill-red-400 transition" />
													</button>
												)}
											</div>
											<div className="grid grid-cols-2 gap-2">
												{imageList.map((image, index) => (
													<div key={index}
															 className="group/image m-auto relative border rounded-xl overflow-hidden w-full h-[150px]">
														<img src={image['data_url']} alt="" width="100"
																 className="absolute w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
														<div
															className="image-item__btn-wrapper absolute w-full h-full bg-black opacity-0 group-hover/image:opacity-50">
															<button onClick={() => onImageUpdate(index)}
																			className="text-white font-bold w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
																Edit
															</button>
															<div className="group/delete inline-block">
																<button onClick={() => onImageRemove(index)}
																				className="absolute top-[5px] right-[5px] border-2 rounded-full p-2 group-hover/delete:border-red-400">
																	<SvgIcon name="close" className="fill-white group-hover/delete:fill-red-400" />
																</button>
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</ImageUploading>
							</Card>
						</div>
					</section>

					<section className="col-span-8">
						{loadingCategory && "Loading..."}
						{!loadingCategory && (
							<div>
								{attributeGroups.map((group, index, arr) => {
									return (
										<Card key={group} title={group} className={`pt-10 ${index === arr.length - 1 ? "" : "mb-10"}`}>
											{groupedAttributes[group].map((attr, index, arr) => (
												<Card key={attr.id} title={attr.label} className={index === arr.length - 1 ? "" : "mb-10"}>
													{getComponentForAttribute(attr)}
												</Card>
											))}
										</Card>
									)
								})}

								<Button disabled={isSubmitting} onClick={formik.handleSubmit} className="w-full py-10 mt-10"
												variant="outline">
									Submit
								</Button>
							</div>
						)}
					</section>
				</div>
			)}
		</>
	);
};

const getProps = (state) => {
	return {
		categories: getCategories(state),
		makes: state.application?.data?.makes || [],
		account: state.session?.account || {}
	};
};

export default connect(getProps)(VehicleForm);
