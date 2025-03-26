import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InstagramProfileHdProfilePicInfoDto {
    @ApiProperty()
    @IsNumber()
    height: number;

    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNumber()
    width: number;
}

export class InstagramProfileBioLinkDto {
    @ApiProperty()
    @IsString()
    icon_url: string;

    @ApiProperty()
    @IsString()
    image_url: string;

    @ApiProperty()
    @IsBoolean()
    is_pinned: boolean;

    @ApiProperty()
    @IsBoolean()
    is_verified: boolean;

    @ApiProperty()
    @IsNumber()
    link_id: number;

    @ApiProperty()
    @IsString()
    link_type: string;

    @ApiProperty()
    @IsString()
    lynx_url: string;

    @ApiProperty()
    @IsString()
    media_type: string;

    @ApiProperty()
    @IsBoolean()
    open_external_url_with_in_app_browser: boolean;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    url: string;
}

export class InstagramProfileBiographyWithEntitiesDto {
    @ApiProperty({ type: [Object] })
    @IsArray()
    entities: {
        user: {
            id: number;
            username: string;
        };
    }[];

    @ApiProperty()
    @IsString()
    raw_text: string;
}

export class InstagramProfileLocationDataDto {
    @ApiProperty()
    @IsString()
    address_street: string;

    @ApiProperty()
    @IsNumber()
    city_id: number;

    @ApiProperty()
    @IsString()
    city_name: string;

    @ApiProperty()
    @IsString()
    instagram_location_id: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    longitude?: number;

    @ApiProperty()
    @IsString()
    zip: string;
}

export class InstagramProfileDataDto {
    @ApiProperty({ type: String, nullable: true })
    @IsOptional()
    @IsString()
    about: string | null;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    account_badges: string[];

    @ApiProperty()
    @IsNumber()
    account_type: number;

    @ApiProperty()
    @IsString()
    biography: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsNumber()
    follower_count: number;

    @ApiProperty()
    @IsNumber()
    following_count: number;

    @ApiProperty()
    @IsNumber()
    media_count: number;

    @ApiProperty()
    @IsBoolean()
    is_private: boolean;

    @ApiProperty()
    @IsBoolean()
    is_verified: boolean;

    @ApiProperty()
    @IsBoolean()
    has_anonymous_profile_picture: boolean;

    @ApiProperty()
    @IsBoolean()
    has_chaining: boolean;

    @ApiProperty()
    @IsBoolean()
    is_business: boolean;

    @ApiProperty()
    @IsBoolean()
    is_favorite: boolean;

    @ApiProperty()
    @IsBoolean()
    is_open_to_collab: boolean;

    @ApiProperty()
    @IsBoolean()
    is_profile_picture_expansion_enabled: boolean;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsNumber()
    category_id: number;

    @ApiProperty()
    @IsString()
    external_url: string;

    @ApiProperty()
    @IsString()
    public_email: string;

    @ApiProperty()
    @IsString()
    profile_pic_url: string;

    @ApiProperty()
    @IsString()
    profile_pic_url_hd: string;

    @ApiProperty()
    @IsNumber()
    total_igtv_videos: number;

    @ApiProperty({ type: InstagramProfileBiographyWithEntitiesDto })
    @ValidateNested()
    @Type(() => InstagramProfileBiographyWithEntitiesDto)
    biography_with_entities: InstagramProfileBiographyWithEntitiesDto;

    @ApiProperty({ type: InstagramProfileHdProfilePicInfoDto })
    @ValidateNested()
    @Type(() => InstagramProfileHdProfilePicInfoDto)
    hd_profile_pic_url_info: InstagramProfileHdProfilePicInfoDto;

    @ApiProperty({ type: [InstagramProfileHdProfilePicInfoDto] })
    @ValidateNested({ each: true })
    @Type(() => InstagramProfileHdProfilePicInfoDto)
    hd_profile_pic_versions: InstagramProfileHdProfilePicInfoDto[];

    @ApiProperty({ type: InstagramProfileLocationDataDto })
    @ValidateNested()
    @Type(() => InstagramProfileLocationDataDto)
    location_data: InstagramProfileLocationDataDto;

    @ApiProperty({ type: [InstagramProfileBioLinkDto] })
    @ValidateNested({ each: true })
    @Type(() => InstagramProfileBioLinkDto)
    bio_links: InstagramProfileBioLinkDto[];
}

export class InstagramProfileDto {
    @ApiProperty({ type: InstagramProfileDataDto })
    @ValidateNested()
    @Type(() => InstagramProfileDataDto)
    data: InstagramProfileDataDto;
}

export class InstagramUserBadActorDto {
    @ApiProperty()
    @IsBoolean()
    is_possible_scammer: boolean;

    @ApiProperty()
    @IsObject()
    is_possible_impersonator: {
        connected_similar_user_id: string | null;
        is_unconnected_impersonator: boolean;
    };

    @ApiProperty()
    @IsObject()
    is_possible_impersonator_threads: {
        connected_similar_user_id: string | null;
        is_unconnected_impersonator: boolean;
    };
}

export class InstagramUserDto {
    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsBoolean()
    is_private: boolean;

    @ApiProperty()
    @IsBoolean()
    is_verified: boolean;

    @ApiProperty()
    @IsNumber()
    latest_reel_media: number;

    @ApiProperty()
    @IsString()
    profile_pic_id: string;

    @ApiProperty()
    @IsString()
    profile_pic_url: string;

    @ApiProperty()
    @IsNumber()
    third_party_downloads_enabled: number;

    @ApiProperty()
    @IsString()
    username: string;
}

export class InstagramUsersDataDto {
    @ApiProperty()
    @IsNumber()
    count: number;

    @ApiProperty({ type: [InstagramUserDto] })
    @ValidateNested({ each: true })
    @Type(() => InstagramUserDto)
    items: InstagramUserDto[];
}

export class InstagramUsersDto {
    @ApiProperty({ type: InstagramUsersDataDto })
    @ValidateNested()
    @Type(() => InstagramUsersDataDto)
    data: InstagramUsersDataDto;
}
