import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils"; // Tailwind class combiner
import { sendEmail } from "@/lib/email";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export type FieldSchema = {
    id: string;
    name: string;
    label: string;
    type:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "select"
    | "checkbox"
    | "switch"
    | "file"
    | "number";
    placeholder?: string;
    options?: string[];
    required?: boolean;
    rows?: number;
    condition?: (values: any) => boolean;
    className?: string; // allow custom field-level styling
    description?: string;
};

export type SectionSchema = {
    group: string;
    layout?: string;
    fields: FieldSchema[];
    className?: string; // per-section styling
};

export type FormSchema = {
    title?: string;
    description?: string;
    submitText?: string;
    submitEndpoint?: string; // optional endpoint to POST submissions to (e.g., Formspree)
    useMailchimp?: boolean; // if true, submit to Mailchimp
    mailchimpFormType?: 'coach' | 'facilitator'; // type of form for Mailchimp tags
    fields: SectionSchema[];
};

const componentRegistry: Record<string, any> = {
    text: Input,
    email: Input,
    tel: Input,
    url: Input,
    textarea: Textarea,
    select: Select,
    checkbox: Checkbox,
    switch: Switch,
    file: Input,
};

export function DynamicForm({
    schema,
    className,
}: {
    readonly schema: FormSchema;
    readonly className?: string;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shape = schema.fields
        .flatMap((s) => s.fields)
        .reduce((acc, f) => {
            acc[f.name] = f.required
                ? z.string().min(1, `${f.label} is required`)
                : z.string().optional();
            return acc;
        }, {} as Record<string, any>);

    const formSchema = z.object(shape);
    const { control, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(formSchema),
    });

    const values = watch();
    const onSubmit = async (data: any) => {
        setIsSubmitting(true);

        try {
            // Send email via Resend
            const result = await sendEmail({
                to: (schema.mailchimpFormType === 'coach' || schema.mailchimpFormType === 'facilitator')
                    ? 'applications@hlcc.africa'
                    : 'info@hlcc.africa',
                subject: `New Application: ${schema.mailchimpFormType || 'Dynamic Form'}`,
                data: data,
                formName: `Application Form (${schema.mailchimpFormType || 'General'})`,
                userEmail: data.email || data.Email || '',
                userName: data.name || data.Name || '',
            });

            if (result.success) {
                toast.success('Application submitted successfully!');
                reset();
            } else {
                toast.error(result.error || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
                "max-w-5xl mx-auto space-y-10 bg-white rounded-2xl shadow-sm p-8 border border-gray-100",
                className
            )}
        >
            {schema.title && (
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    {schema.title}
                </h2>
            )}
            {schema.description && (
                <p className="text-gray-600 text-base mb-6">{schema.description}</p>
            )}

            <div className="space-y-10">
                {schema.fields.map((section) => (
                    <Card
                        key={section.group}
                        className={cn(
                            "shadow-none border border-gray-100 bg-gray-50/30 rounded-xl",
                            section.className
                        )}
                    >
                        <CardHeader>
                            <CardTitle className="text-xl text-gray-800 font-semibold">
                                {section.group}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={cn(
                                    "grid gap-6",
                                    section.layout || "md:grid-cols-2"
                                )}
                            >
                                {section.fields.map((f) => {
                                    const Comp = componentRegistry[f.type];
                                    if (!Comp) return null;
                                    if (f.condition && !f.condition(values)) return null;

                                    return (
                                        <div
                                            key={f.id}
                                            className={cn("flex flex-col gap-2", f.className)}
                                        >
                                            <Label
                                                htmlFor={f.id}
                                                className="font-medium text-gray-700"
                                            >
                                                {f.label}
                                                {f.required && (
                                                    <span className="text-red-500 ml-1">*</span>
                                                )}
                                            </Label>

                                            <Controller
                                                name={f.name}
                                                control={control}
                                                render={({ field }) => {
                                                    if (f.type === "select" && f.options)
                                                        return (
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value as string}
                                                            >
                                                                <SelectTrigger className="bg-white border-gray-200 focus:ring-[var(--blue-accent)]">
                                                                    <SelectValue placeholder={f.placeholder} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {f.options.map((opt) => (
                                                                        <SelectItem key={opt} value={opt}>
                                                                            {opt}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        );

                                                    if (f.type === "checkbox")
                                                        return (
                                                            <Checkbox
                                                                checked={field.value as any}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        );

                                                    if (f.type === "switch")
                                                        return (
                                                            <Switch
                                                                checked={field.value as any}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        );

                                                    if (f.type === "textarea")
                                                        return (
                                                            //@ts-ignore
                                                            <Textarea
                                                                id={f.id}
                                                                {...field}
                                                                placeholder={f.placeholder as string}
                                                                rows={f.rows || 4 as number}
                                                                required={f.required as boolean}
                                                                className="resize-none bg-white border-gray-200 focus:ring-[var(--blue-accent)]"
                                                            />
                                                        );

                                                    return (
                                                        <Comp
                                                            id={f.id}
                                                            {...field}
                                                            type={f.type === "file" ? "file" : f.type}
                                                            placeholder={f.placeholder}
                                                            required={f.required}
                                                            className="bg-white border-gray-200 focus:ring-[var(--blue-accent)]"
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="pt-4 flex justify-end">
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white font-semibold shadow-sm hover:opacity-90 transition-all"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        schema.submitText || "Submit"
                    )}
                </Button>
            </div>
        </form>
    );
}
