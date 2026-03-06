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
    const { control, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
    });

    const values = watch();
    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const result = await sendEmail({
                to: 'applications@hlcc.africa',
                subject: `New Application: ${schema.mailchimpFormType || 'Dynamic Form'}`,
                data: data,
                formName: `Application Form (${schema.mailchimpFormType || 'General'})`,
                userEmail: data.email || data.Email || '',
                userName: data.name || data.Name || '',
            });

            if (result.success) {
                toast.success('Your application has been received with thanks.');
                reset();
            } else {
                toast.error(result.error || 'Submission failed. Please try again.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("max-w-4xl mx-auto space-y-20 bg-transparent", className)}
        >
            <div className="space-y-24">
                {schema.fields.map((section) => (
                    <div key={section.group} className={cn("space-y-12", section.className)}>
                        <div className="border-b border-black/5 pb-6">
                            <h3 className="text-2xl font-heading font-light text-black italic">
                                {section.group}
                            </h3>
                        </div>

                        <div className={cn("grid gap-x-12 gap-y-10", section.layout || "md:grid-cols-2")}>
                            {section.fields.map((f) => {
                                const Comp = componentRegistry[f.type];
                                if (!Comp) return null;
                                if (f.condition && !f.condition(values)) return null;

                                return (
                                    <div key={f.id} className={cn("flex flex-col gap-4", f.className)}>
                                        <Label
                                            htmlFor={f.id}
                                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40"
                                        >
                                            {f.label}
                                            {f.required && <span className="text-[#D4AF37] ml-1">*</span>}
                                        </Label>

                                        <Controller
                                            name={f.name}
                                            control={control}
                                            render={({ field }) => {
                                                const baseInputStyles = "border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all placeholder:text-black/10 text-lg font-light shadow-none";

                                                if (f.type === "select" && f.options)
                                                    return (
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value as string}
                                                        >
                                                            <SelectTrigger className={baseInputStyles}>
                                                                <SelectValue placeholder={f.placeholder} />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-none border-black/10">
                                                                {f.options.map((opt) => (
                                                                    <SelectItem key={opt} value={opt} className="text-sm font-light py-3">
                                                                        {opt}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    );

                                                if (f.type === "textarea")
                                                    return (
                                                        <Textarea
                                                            id={f.id}
                                                            {...field}
                                                            placeholder={f.placeholder as string}
                                                            rows={f.rows || 4}
                                                            className={cn(baseInputStyles, "min-h-[120px] resize-none")}
                                                        />
                                                    );

                                                if (f.type === "checkbox")
                                                    return (
                                                        <div className="flex items-center space-x-3 py-2">
                                                            <Checkbox
                                                                id={f.id}
                                                                checked={field.value as any}
                                                                onCheckedChange={field.onChange}
                                                                className="border-black/20 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37] rounded-none"
                                                            />
                                                            <label htmlFor={f.id} className="text-sm font-light text-black/60 cursor-pointer">{f.description || f.label}</label>
                                                        </div>
                                                    );

                                                return (
                                                    <Input
                                                        id={f.id}
                                                        {...field}
                                                        type={f.type === "file" ? "file" : f.type}
                                                        placeholder={f.placeholder}
                                                        className={cn(baseInputStyles, f.type === "file" && "file:bg-black/5 file:border-0 file:rounded-none file:text-[10px] file:uppercase file:font-bold file:tracking-widest file:px-4 file:py-2 file:mr-4 file:cursor-pointer")}
                                                    />
                                                );
                                            }}
                                        />
                                        {errors[f.name] && (
                                            <p className="text-[10px] uppercase font-bold text-red-500/80 tracking-widest mt-1">
                                                {errors[f.name]?.message as string}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-12">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-16 py-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#D4AF37] transition-all duration-500 w-full md:w-auto shadow-xl"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                            Processing Brief...
                        </>
                    ) : (
                        schema.submitText || "Submit Brief"
                    )}
                </Button>
            </div>
        </form>
    );
}
